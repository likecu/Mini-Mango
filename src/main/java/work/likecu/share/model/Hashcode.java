package work.likecu.share.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Table(name = "`Hashcode`")
public class Hashcode {
    @Id
    @Column(name = "`id`")
    private Integer Id;

    @Column(name = "`code`")
    private String Code;

    @Column(name = "`url`")
    private String Url;

}
