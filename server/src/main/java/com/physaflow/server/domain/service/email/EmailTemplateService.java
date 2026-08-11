package com.physaflow.server.domain.service.email;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
public class EmailTemplateService {

    public String render(String templateName, Map<String, String> variables) {

        try {
            ClassPathResource resource =
                    new ClassPathResource("templates/email/" + templateName);

            String template = new String(
                    resource.getInputStream().readAllBytes(),
                    StandardCharsets.UTF_8
            );

            for (Map.Entry<String, String> entry : variables.entrySet()) {
                template = template.replace(
                        "{{" + entry.getKey() + "}}",
                        entry.getValue()
                );
            }

            return template;

        } catch (IOException e) {
            throw new IllegalStateException(
                    "Unable to load email template: " + templateName,
                    e
            );
        }
    }

}
