import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTask = async () => {
    try {
      // Combine date and time into a single string
      const dateTime = `${date.toDateString()} ${time}`;

      await axios.post('http://localhost:5000/api/tasks', {
        title,
        description,
        priority,
        date,
        time: dateTime // Assign combined date and time to the time field
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        multiline
        numberOfLines={4}
        onChangeText={setDescription}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Priority"
        value={priority}
        onChangeText={setPriority}
        placeholderTextColor="#999"
      />
      <View style={styles.datePickerContainer}>
        <Button title="Choose Date" onPress={() => setShowDatePicker(true)} color="#007BFF" />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={setDate}
          />
        )}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM AM/PM)"
        value={time}
        onChangeText={setTime}
        placeholderTextColor="#999"
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Task" onPress={handleAddTask} color="#28A745" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  datePickerContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 5,
  },
});

export default AddTaskScreen;
