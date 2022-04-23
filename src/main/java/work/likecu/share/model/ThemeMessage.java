package work.likecu.share.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "`theme_message`")
public class ThemeMessage {
    @Id
    @Column(name = "`theme_id`")
    private Integer themeId;

    @Column(name = "`theme_title`")
    private String themeTitle;

    @Column(name = "`theme_intro`")
    private String themeIntro;

    @Column(name = "`theme_use`")
    private Integer themeUse;

    @Column(name = "`theme_image`")
    private String themeImage;

    @Column(name = "`create_time`")
    private Date createTime;

    @Column(name = "`owner_id`")
    private Integer ownerId;

    @Column(name = "`public_or`")
    private Integer publicOr;


    /**
     * @return theme_id
     */
    public Integer getThemeId() {
        return themeId;
    }

    /**
     * @param themeId
     */
    public void setThemeId(Integer themeId) {
        this.themeId = themeId;
    }

    /**
     * @return theme_title
     */
    public String getThemeTitle() {
        return themeTitle;
    }

    /**
     * @param themeTitle
     */
    public void setThemeTitle(String themeTitle) {
        this.themeTitle = themeTitle;
    }

    /**
     * @return theme_intro
     */
    public String getThemeIntro() {
        return themeIntro;
    }

    /**
     * @param themeIntro
     */
    public void setThemeIntro(String themeIntro) {
        this.themeIntro = themeIntro;
    }

    /**
     * @return theme_use
     */
    public Integer getThemeUse() {
        return themeUse;
    }

    /**
     * @param themeUse
     */
    public void setThemeUse(Integer themeUse) {
        this.themeUse = themeUse;
    }

    /**
     * @return theme_image
     */
    public String getThemeImage() {
        return themeImage;
    }

    /**
     * @param themeImage
     */
    public void setThemeImage(String themeImage) {
        this.themeImage = themeImage;
    }

    /**
     * @return create_time
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * @param createTime
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * @return ownerId
     */
    public Integer getOwnerId() {
        return ownerId;
    }


    /**
     * @param ownerId
     */
    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    /**
     * @return publicOr
     */
    public Integer getPublicOr() {
        return publicOr;
    }


    /**
     * @param publicOr
     */
    public void setPublicOr(Integer publicOr) {
        this.publicOr = publicOr;
    }
}