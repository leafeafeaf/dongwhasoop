package com.fairytale.FairyTale.domain.book.service;

import com.fairytale.FairyTale.domain.book.domain.repository.BookRepository;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.BookListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public Slice<BookListResponse> getBookList(PageRequest pageRequest) {
        return bookRepository.findAllBooks(pageRequest).map(BookListResponse::from);
    }
}
