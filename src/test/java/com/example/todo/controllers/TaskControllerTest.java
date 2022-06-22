package com.example.todo.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.example.todo.models.Task;
import com.example.todo.repository.TaskRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(TaskController.class)
public class TaskControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskRepository taskRepository;

    @Test
    public void addTask() throws Exception{
        ObjectMapper mapper = new ObjectMapper();

        Task task = new Task();
        task.setDescription("Test Task");
        task.setStatus("NEW");

        String taskJsonString = mapper.writeValueAsString(task);

        when(taskRepository.saveAndFlush(any())).thenReturn(task);

        MvcResult result = mockMvc.perform(
            MockMvcRequestBuilders.post("/task")
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)
            .content(taskJsonString)
            ).andExpect(MockMvcResultMatchers.status().isOk())
            .andReturn();

        assertNotNull(result);



        verify(taskRepository, times(1)).saveAndFlush(ArgumentMatchers.refEq(task));

        Task actualTask = mapper.readValue(result.getResponse().getContentAsString(), Task.class);

        assertEquals(task.getDescription(), actualTask.getDescription());
        assertEquals(task.getStatus(), actualTask.getStatus());
    }
}
