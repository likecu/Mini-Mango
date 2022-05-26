package work.likecu.share.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Table;
import java.util.Date;

@Data
@Table(name = "`sign_record`")
public class SignRecord {

    @Column(name = "`user_id`")
    private Integer userId;

    @Column(name = "`record_id`")
    private Integer recordId;

    @Column(name = "'sign_time`")
    private Date signTime;

    @Column(name = "`sign_type`")
    private Integer signType;
}