package work.likecu.share.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Table;
import java.util.Date;


@Data
@Table(name = "`group_member`")
public class GroupMessage {
    @Column(name = "`theme_id`")
    private String themeId;

    @Column(name = "`user_id`")
    private Integer userId;

    @Column(name = "`create_time`")
    private Date createTime;

    @Column(name = "`user_type`")
    private Integer userType;

    public String getThemeId() {
        return themeId;
    }
    public void setThemeId(String themeId) {
        this.themeId = themeId;
    }

    public Integer getUserId() {
        return userId;
    }
    public void setuserId(Integer userId) {
        this.userId = userId;
    }

    public Date getcreateTime() {return createTime;}
    public void setcreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getuserType() {
        return userType;
    }
    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    private UserMessage userMessage;
}
