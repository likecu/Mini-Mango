package work.likecu.share.mapper;

import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;
import work.likecu.share.model.CommentMessage;

import java.util.List;

public interface CommentMessageMapper extends Mapper<CommentMessage> {


    List<CommentMessage> getCommentById(@Param("articleId") Integer articleId);

    CommentMessage getCommentMessage(@Param("commentId")Integer commentId);

}