package work.likecu.share.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import work.likecu.share.basemapper.SameService;
import work.likecu.share.mapper.ArticleMessageMapper;
import work.likecu.share.model.ArticleMessage;

import javax.annotation.Resource;

@Service
public class ArticleOperationService extends SameService<ArticleMessage> {


    @Resource
    private ArticleMessageMapper articleMessageMapper;

    public PageInfo getNewArticle(Integer pageNumber, Integer articleId, Integer themeId, Integer userId) {

        PageHelper.startPage(pageNumber, 8);

        return new PageInfo(articleMessageMapper.getNewArticle(articleId, themeId, userId));

    }

    public PageInfo getNewArticle_isPublic(Integer pageNumber, Integer articleId, Integer themeId, Integer userId,Integer isPublc) {

        PageHelper.startPage(pageNumber, 8);

        return new PageInfo(articleMessageMapper.getNewArticle_isPublic(articleId, themeId, userId,isPublc));

    }

    /**
     * 通过id获取文章
     *
     * @param articleId
     * @return
     */
    public ArticleMessage getNewArticleById(Integer articleId) {
        return articleMessageMapper.getNewArticleById(articleId);
    }

    /**
     * 获取精选文章
     */
    public PageInfo getAllLikeArticle(Integer pageNumber) {

        PageHelper.startPage(pageNumber, 8);

        return new PageInfo(articleMessageMapper.getAllLikeArticle());
    }


}
