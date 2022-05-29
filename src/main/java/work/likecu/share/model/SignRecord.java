package work.likecu.share.model;

import lombok.Data;

import java.util.Date;
import javax.persistence.*;

@Data
@Table(name = "`sign_record`")
public class SignRecord {
    @Id
    @Column(name = "`record_id`")
    private Integer recordId;

    @Column(name = "`user_id`")
    private Integer userId;

    @Column(name = "`sign_time`")
    private Date signtime;

    @Column(name = "`sign_type`")
    private Integer signType;
}