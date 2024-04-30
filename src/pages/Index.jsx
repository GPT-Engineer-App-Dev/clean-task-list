import { useState } from 'react';
import { Box, Input, Button, List, ListItem, ListIcon, IconButton } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTask = { id: Date.now(), text: input, isCompleted: false };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={5}>
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        mb={4}
      />
      <Button onClick={handleAddTask} colorScheme="blue" mb={4}>Add Task</Button>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" alignItems="center">
            <ListIcon as={task.isCompleted ? FaCheckCircle : FaCheckCircle} color={task.isCompleted ? 'green.500' : 'gray.500'} onClick={() => handleToggleComplete(task.id)} cursor="pointer" />
            <Box flex="1" as="span" textDecoration={task.isCompleted ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;