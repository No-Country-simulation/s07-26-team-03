package com.physaflow.server.domain.interfaces;

import com.physaflow.server.domain.model.enums.OtpPurpose;

public interface EmailServices {

    void sendOtp(
            String email,
            String code,
            OtpPurpose purpose
    );
}
