package com.fairytale.FairyTale.domain.book.domain.repository;

import com.fairytale.FairyTale.domain.book.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
