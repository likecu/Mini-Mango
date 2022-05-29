

package work.likecu.share.mapper;

import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;
import work.likecu.share.model.SignUsers;

import java.util.List;

public interface SignUsersMapper extends Mapper<SignUsers> {


    List<SignUsers> getRank20(@Param("signType") Integer signType);

}
