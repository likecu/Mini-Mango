package work.likecu.share.mapper;

import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;
import work.likecu.share.model.ThemeMessage;

import java.util.List;

public interface ThemeMessageMapper extends Mapper<ThemeMessage> {

    List<ThemeMessage> getAllTheme(@Param("use") Integer use);
    List<ThemeMessage> getCounter(@Param("themeTitle") String themeTitle);
    int getThemeId(@Param("themeTitle") String themeTitle);
}