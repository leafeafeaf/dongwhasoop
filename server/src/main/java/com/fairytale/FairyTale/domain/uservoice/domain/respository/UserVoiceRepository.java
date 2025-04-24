package com.fairytale.FairyTale.domain.uservoice.domain.respository;

import com.fairytale.FairyTale.domain.uservoice.domain.UserVoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserVoiceRepository extends JpaRepository<UserVoice, Long> {
}
