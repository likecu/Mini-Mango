package work.likecu.share.model;

import lombok.Data;

@Data
public class WXSessionModel {

    private String session_key;
    private Integer expires_in;
    private String openid;
    private String phoneNumber;
    private Integer userId;
    
}
