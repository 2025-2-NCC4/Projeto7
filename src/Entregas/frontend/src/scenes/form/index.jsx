// src/scenes/form/index.jsx
import { Box, Button, TextField, Alert, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { auth, db } from "../auth/firebase";
import {
  updateEmail,
  updateProfile,
  updatePassword,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) return;
      const currentUser = auth.currentUser;
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUser({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: currentUser.email,
            phone: data.phone || "",
            role: data.cargo || "CEO",
          });
        } else {
          setUser({
            firstName: currentUser.displayName?.split(" ")[0] || "",
            lastName: currentUser.displayName?.split(" ")[1] || "",
            email: currentUser.email,
            phone: currentUser.phoneNumber || "",
            role: "CEO",
          });
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleFormSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    if (!user) return;
    try {
      const currentUser = auth.currentUser;

      await updateProfile(currentUser, {
        displayName: `${values.firstName} ${values.lastName}`,
      });

      if (currentUser.email !== values.email) {
        await updateEmail(currentUser, values.email);
      }

      if (values.currentPassword && values.newPassword) {
        const credential = EmailAuthProvider.credential(currentUser.email, values.currentPassword);
        await reauthenticateWithCredential(currentUser, credential);

        if (values.newPassword !== values.confirmPassword) {
          setErrors({ submit: "Nova senha e confirmação não coincidem." });
          setSubmitting(false);
          return;
        }
        await updatePassword(currentUser, values.newPassword);
      }

      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        cargo: values.role,
      });

      setSuccessMessage("Perfil atualizado com sucesso!");
      setTimeout(() => setSuccessMessage(""), 5000);

      resetForm({
        values: {
          ...values,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        },
      });
    } catch (err) {
      console.error(err);
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  if (loading) return <p>Carregando...</p>;
  if (!user) return <p>Usuário não encontrado</p>;

  return (
    <Box
      m="10px"
      sx={{
        height: "calc(100vh - 70px)",
        overflow: "auto",
        paddingLeft: "40px", // ✅ padding pequeno agora
        transition: "all 0.2s ease",
      }}
    >
      <Header title="Perfil" subtitle="Atualize seus dados ou saia da conta" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={checkoutSchema}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="10px">
              <TextField fullWidth variant="filled" label="Nome" name="firstName" value={values.firstName}
                onBlur={handleBlur} onChange={handleChange} error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName} />

              <TextField fullWidth variant="filled" label="Sobrenome" name="lastName" value={values.lastName}
                onBlur={handleBlur} onChange={handleChange} error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName} />

              <TextField fullWidth variant="filled" label="Email" name="email" value={values.email}
                onBlur={handleBlur} onChange={handleChange} error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email} />

              <TextField fullWidth variant="filled" label="Telefone" name="phone" value={values.phone}
                onBlur={handleBlur} onChange={handleChange} error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone} />

              <TextField select fullWidth variant="filled" label="Cargo" name="role" value={values.role}
                onChange={handleChange}>
                <MenuItem value="CEO">CEO</MenuItem>
                <MenuItem value="CFO">CFO</MenuItem>
              </TextField>

              <TextField fullWidth variant="filled" type="password" label="Senha Atual" name="currentPassword"
                value={values.currentPassword} onBlur={handleBlur} onChange={handleChange}
                error={!!touched.currentPassword && !!errors.currentPassword}
                helperText={touched.currentPassword && errors.currentPassword} />

              <TextField fullWidth variant="filled" type="password" label="Nova Senha" name="newPassword"
                value={values.newPassword} onBlur={handleBlur} onChange={handleChange}
                error={!!touched.newPassword && !!errors.newPassword}
                helperText={touched.newPassword && errors.newPassword} />

              <TextField fullWidth variant="filled" type="password" label="Confirmar Nova Senha" name="confirmPassword"
                value={values.confirmPassword} onBlur={handleBlur} onChange={handleChange}
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword} />

              {errors.submit && <Alert severity="error">{errors.submit}</Alert>}
              {successMessage && <Alert severity="success">{successMessage}</Alert>}

              <Box display="flex" flexDirection="column" gap="10px" mt="10px">
                <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting}>
                  Atualizar Perfil
                </Button>

                <Button type="button" color="error" variant="outlined" onClick={handleLogout}>
                  Sair
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
  currentPassword: yup.string(),
  newPassword: yup.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  confirmPassword: yup.string(),
  role: yup.string().oneOf(["CEO", "CFO"]).required("required"),
});

export default Form;
