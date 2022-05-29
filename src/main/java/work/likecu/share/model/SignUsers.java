package work.likecu.share.model;
import lombok.Data;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Table(name = "`sign_users`")
public class SignUsers {
    @Id
    @Column(name = "`id`")
    private Integer id;

    @Column(name = "`user_id`")
    private Integer userId;

    @Column(name = "`group_id`")
    private Integer groupId;

    @Column(name = "`sign_time`")
    private Date signtime;

    @Column(name = "`sign_type`")
    private Integer signType;

    @Column(name = "`counter`")
    private Integer counter;

    @Column(name = "`is_group`")
    private Integer isGroup;

}
