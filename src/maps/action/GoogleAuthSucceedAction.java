package maps.action;

import java.util.Properties;

import maps.constants.PageConstants;
import maps.data.User;

import oauth4j.action.AbstractAction;
import oauth4j.data.GoogleKeys;
import oauth4j.data.SessionData;
import oauth4j.util.CommonLog;

public class GoogleAuthSucceedAction extends AbstractAction{

	@Override
	public void execute() {
		CommonLog.writeLog(this.getClass().getName(), METHOD_EXECUTE, "start.. request data:" + getReqData(), CommonLog.LOG_INFO);
		SessionData sd = getSessionData();
		Properties userProp = (Properties)sd.get(GoogleKeys.GOOGLE_USER_PROPERTIES);
		if(User.getUser(userProp.getProperty(GoogleKeys.KEY_ID))==null) User.createUser(userProp);
		CommonLog.writeLog(this.getClass().getName(), METHOD_EXECUTE, "user:" + userProp, CommonLog.LOG_INFO);
		sendRedirect(PageConstants.PAGE_REDIRECT_TO_TOP);
		CommonLog.writeLog(this.getClass().getName(), METHOD_EXECUTE, "end..", CommonLog.LOG_INFO);
	}

}
