package com.acebook.onlinebookstore.repository;

import com.acebook.onlinebookstore.entity.Book;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
    
}