package com.fairytale.FairyTale.domain.child.service;

import com.fairytale.FairyTale.domain.child.presentation.dto.request.RegisterNewChildRequest;
import com.fairytale.FairyTale.domain.child.presentation.dto.response.ChildrenResponse;

public interface ChildService {

    ChildrenResponse getChildList();
    void registerNewChild(RegisterNewChildRequest request);
}
