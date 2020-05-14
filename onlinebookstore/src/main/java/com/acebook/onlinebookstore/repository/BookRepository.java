package com.acebook.onlinebookstore.repository;

import com.acebook.onlinebookstore.entity.Book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface BookRepository extends JpaRepository<Book, Long> {
    
}