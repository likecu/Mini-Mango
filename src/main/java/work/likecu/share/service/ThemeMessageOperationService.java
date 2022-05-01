package work.likecu.share.service;

import org.springframework.stereotype.Service;
import work.likecu.share.basemapper.SameService;
import work.likecu.share.mapper.ThemeMessageMapper;
import work.likecu.share.model.ThemeMessage;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ThemeMessageOperationService extends SameService<ThemeMessage> {
    @Resource
    private ThemeMessageMapper themeMessageMapper;


    /**
     * 获取所有主题
     *
     * @param use
     * @return
     */
    public List<ThemeMessage> getAllTheme(Integer use) {
        return themeMessageMapper.getAllTheme(use);
    }
    public boolean hasTheme(String name){
        return themeMessageMapper.getCounter(name).size() >0;
    }
    public Integer getThemeId(String name){
        return themeMessageMapper.getCounter(name).get(0).getThemeId();
    }
    public Integer getOwner(String name){
        return themeMessageMapper.getCounter(name).get(0).getOwnerId();
    }


}
