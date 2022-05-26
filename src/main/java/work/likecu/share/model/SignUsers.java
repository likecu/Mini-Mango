package work.likecu.share.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Table;
import java.util.Date;

@Data
@Table(name = "`sign_users`")
public class SignUsers {

    @Column(name = "`user_id`")
    private Integer userId;

    @Column(name = "`group_id`")
    private Integer groupId;

    @Column(name = "'sign_time`")
    private Date signTime;

    @Column(name = "`sign_type`")
    private Integer signType;

    @Column(name = "`counter`")
    private Integer counter;

    @Column(name = "`is_group`")
    private Integer isGroup;
    
    private SignRecord signRecord;
}
