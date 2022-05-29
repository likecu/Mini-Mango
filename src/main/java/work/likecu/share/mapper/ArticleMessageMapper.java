package work.likecu.share.mapper;

import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;
import work.likecu.share.model.ArticleMessage;

import java.util.List;

public interface ArticleMessageMapper extends Mapper<ArticleMessage> {
    /**
     *
     * @Path: work\likecu\share\mapper\ArticleMessageMapper.java
     * @author: likecu
     * @create: 2022-05-28 23:03
     */

    /**
     * 获取最新的文章
     *
     * @return
     */
    List<ArticleMessage> getNewArticle(@Param("articleId") Integer articleId, @Param("themeId") Integer themeId, @Param("userId") Integer userId);

    List<ArticleMessage> getNewArticle_isPublic(@Param("articleId") Integer articleId,
                                                @Param("themeId") Integer themeId,
                                                @Param("userId") Integer userId,
                                                @Param("isPublic")Integer isPublic);
    /**
     * 通过id获取文章
     */

    ArticleMessage getNewArticleById(@Param("articleId") Integer articleId);

    /**
     * 获取精选文章
     * @return
     */
    List<ArticleMessage> getAllLikeArticle();
}