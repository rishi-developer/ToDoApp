// EditTaskScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const EditTaskScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}`);
      setTask(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setPriority(response.data.priority);

      const taskTime = new Date(response.data.time);
      setDate(taskTime);
      setTime(taskTime.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }));
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleEditTask = async () => {
    try {
      const dateTime = `${date.toDateString()} ${time}`;
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        title,
        description,
        priority,
        date,
        time: dateTime
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Priority"
        value={priority}
        onChangeText={setPriority}
      />
      <DateTimePicker
        style={styles.datePicker}
        value={date}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => setDate(selectedDate || date)}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM AM/PM)"
        value={time}
        onChangeText={setTime}
      />
      <View style={styles.buttonContainer}>
        <Button color="#007BFF" title="Edit Task" onPress={handleEditTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  datePicker: {
    marginVertical: 15,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default EditTaskScreen;
