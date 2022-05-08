package work.likecu.share.util.status;

/**
 * 响应状态码和说明
 */


public enum CodeEnum {
    SUCCESS_BUT_MORE(200, "已经登陆多台设备,可能存在被盗风险,请及时修改密码"),
    SUCCESS(200, "成功"),
    BODY_NOT_MATCH(400, "请求的数据格式不正确"),
    User_Already_Join(403,"用户已经在小组内"),
    User_Name_Repeated(403,"该用户名称过多，请使用id进行查询"),
    User_Name_Not_Found(403,"找不到该用户名，请注意大小写或标点符号"),
    SIGNATURE_NOT_MATCH(401, "请求的数字签名不匹配"),
    SIGNATURE_NOT_ALLOW(403, "没有权限"),
    CARD_REPEATED(403,"已存在该卡"),
    NO_PICTURE(403,"请加入图片！"),
    Theme_Del_NOT_ALLOW(403,"小组不存在"),
    Theme_Author_NOT_ALLOW(403,"权限不足，无法删除小组"),
    Theme_NOT_ALLOW(403, "该小组名称已存在"),
    SIGNATURE_EXIT(403, "退出"),
    NOT_FOUND(404, "未找到该资源"),
    INTERNAL_SERVER_ERROR(500, "服务器内部错误"),
    FAIL(-1, "发生未知错误"),
    SERVER_BUSY(503, "服务器正忙，请稍后再试!");

    /**
     * 响应状态码
     */
    private final Integer code;

    /**
     * 响应提示
     */
    private final String msg;

    CodeEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }


    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}