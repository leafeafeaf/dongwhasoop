package com.fairytale.FairyTale.domain.book.service;

import com.fairytale.FairyTale.domain.book.presentation.dto.response.BookListResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;

public interface BookService {

    Slice<BookListResponse> getBookList(PageRequest pageRequest);
}
