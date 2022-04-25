package work.likecu.share.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

@Data
@Table(name = "`article_message`")
public class ArticleMessage {
    @Id
    @Column(name = "`article_id`")
    private Integer articleId;

    @Column(name = "`article_content`")
    private String articleContent;

    @Column(name = "`user_id`")
    private Integer userId;

    @Column(name = "`theme_id`")
    private Integer themeId;

    @Column(name = "`create_time`")
    private Date createTime;

    @Column(name = "`is_public`")
    private Integer isPublic;

    @Column(name = "`like_counter`")
    private Integer likeCounter;

    @Column(name = "`comment_counter`")
    private Integer commentCounter;

    private UserMessage userMessage;

    private ThemeMessage themeMessage;

    private List<CommentMessage> commentMessages;

}