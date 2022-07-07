package com.example.todo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.models.Task;
import com.example.todo.repository.TaskRepository;

@RestController
@RequestMapping("/task")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    @PostMapping
    public Task addTask(@RequestBody Task task){
        return taskRepository.saveAndFlush(task);
    }

    @GetMapping("/all")
    public List<Task> getListOfTasks(){
        return taskRepository.findAll();
    }  

    @DeleteMapping("/{id}")
    public Boolean deleteTask(@PathVariable Long id){
        taskRepository.deleteById(id);
        return true;
    }

    @PutMapping
    public Task updateTask(@RequestBody Task task) {
        return taskRepository.saveAndFlush(task);
    }

    @GetMapping("searchByKeyword/{keyword}")
    public List<Task> searchListOfTasksByKeyword(@PathVariable String keyword){
        return taskRepository.findByDescriptionContaining(keyword);
    }
}
