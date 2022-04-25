package work.likecu.share.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import work.likecu.share.basemapper.SameService;
import work.likecu.share.mapper.CommentMessageMapper;
import work.likecu.share.model.CommentMessage;

import javax.annotation.Resource;

@Service
public class CommentService extends SameService<CommentMessage> {

    @Resource
    private CommentMessageMapper commentMessageMapper;

    /**
     * 获取评论
     */
    public PageInfo getCommentById(Integer pageNumber, Integer articleId) {
        PageHelper.startPage(pageNumber, 10);

        return new PageInfo(commentMessageMapper.getCommentById(articleId));

    }

    /**
     * 获取评论的人信息以及内容
     */



    public CommentMessage getCommentMessage(Integer commentId) {


        return commentMessageMapper.getCommentMessage(commentId);
    }
}
