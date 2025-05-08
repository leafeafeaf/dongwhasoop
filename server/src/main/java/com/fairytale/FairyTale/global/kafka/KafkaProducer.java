package com.fairytale.FairyTale.global.kafka;

import com.fairytale.FairyTale.global.kafka.dto.request.KafkaTtsCommand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class KafkaProducer {

    private final KafkaTemplate<String, KafkaTtsCommand> kafkaTtsTemplate;

    @Value("${spring.kafka.producer.topic}")
    private String topic;

    public void sendCreateTts(Long bookId, Long voiceId, Long userId) {
        KafkaTtsCommand command = KafkaTtsCommand.of("CREATE_TTS",
            KafkaTtsCommand.TtsPayload.of(bookId, voiceId, userId));

        kafkaTtsTemplate.send(topic, command);

        log.info("📨 TTS 요청 전송: {}", command);
    }
}
