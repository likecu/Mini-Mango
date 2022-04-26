package work.likecu.share.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;


@Data
@Table(name = "`notice_message`")

public class Picture {

    @Id
    @Column(name = "`img_url`")
    private String imgUrl;

    @Column(name = "'img_data'")
    private String imgData;

    @Column(name = "'upload_time")
    private Date uploadTime;

}
