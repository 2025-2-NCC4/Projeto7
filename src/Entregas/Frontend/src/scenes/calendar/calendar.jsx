// src/scenes/calendar/calendar.jsx
import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { auth, db } from "../auth/firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const eventsRef = collection(db, "users", user.uid, "events");

    const unsubscribe = onSnapshot(eventsRef, (snapshot) => {
      const events = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
      }));
      setCurrentEvents(events);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDateClick = async (selected) => {
    const title = prompt("Digite o título do novo evento:");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title && user) {
      const eventData = {
        title,
        start: selected.start,
        end: selected.end,
        allDay: selected.allDay,
      };

      try {
        const docRef = await addDoc(collection(db, "users", user.uid, "events"), eventData);
        calendarApi.addEvent({
          id: docRef.id,
          ...eventData,
        });
      } catch (err) {
        console.error("Erro ao salvar evento:", err);
      }
    }
  };

  const handleEventClick = async (selected) => {
    if (window.confirm(`Tem certeza que deseja deletar o evento '${selected.event.title}'?`)) {
      const eventId = selected.event.id;
      selected.event.remove();

      if (user) {
        try {
          await deleteDoc(doc(db, "users", user.uid, "events", eventId));
        } catch (err) {
          console.error("Erro ao deletar evento:", err);
        }
      }
    }
  };

  return (
    <Box m="20px" p="20px" backgroundColor={colors.primary[400]} borderRadius="8px">
      <Header
        title="Calendário"
        subtitle="Escreva um de seus afazeres em algum dia do nosso calendário para ficar salvo"
      />

      <Box display="flex" justifyContent="space-between" mt="20px">
        {/* LISTA DE EVENTOS */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[500]}
          p="20px"
          borderRadius="8px"
        >
          <Typography variant="h5">Eventos</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "4px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDÁRIO */}
        <Box
          flex="1 1 100%"
          ml="20px"
          p="20px"
          backgroundColor={colors.primary[500]}
          borderRadius="8px"
        >
          <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents.map((event) => ({
              id: event.id,
              title: event.title,
              start: event.start,
              end: event.end,
              allDay: event.allDay,
            }))}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
