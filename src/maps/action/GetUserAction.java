package maps.action;

import java.util.Properties;

import maps.constants.ErrorCodeConstants;
import maps.data.User;

import oauth4j.action.AbstractAction;
import oauth4j.data.GoogleKeys;
import oauth4j.data.SessionData;
import oauth4j.util.CommonLog;
import oauth4j.util.HRF;

public class GetUserAction extends AbstractAction{

	@Override
	public void execute() {
		CommonLog.writeLog(this.getClass().getName(), METHOD_EXECUTE, "start.. request data:" + getReqData(), CommonLog.LOG_INFO);
		SessionData sd = getSessionData();
		Properties userProp = (Properties)sd.get(GoogleKeys.GOOGLE_USER_PROPERTIES);
		if(userProp==null){
			CommonLog.writeLog(this.getClass().getName(), METHOD_EXECUTE, "SESSION LOGGED OUT!", CommonLog.LOG_INFO);
			write(HRF.format(HRF.RC_BUSINESS_ERROR, ErrorCodeConstants.SESSION_LOGGED_OUT));
			return;
		}
		userProp = User.getUser(userProp.getProperty(GoogleKeys.KEY_ID));
		if(userProp==null){
			CommonLog.writeLog(this.getClass().getName(), METHOD_EXECUTE, "SESSION UNSIGNED USER!", CommonLog.LOG_INFO);
			write(HRF.format(HRF.RC_BUSINESS_ERROR, ErrorCodeConstants.SESSION_UNSIGNED_USER));
			return;
		} 
		write(HRF.format(HRF.RC_SUCCESS, "", userProp));	
		CommonLog.writeLog(this.getClass().getName(), METHOD_EXECUTE, "end..", CommonLog.LOG_INFO);
	}

}
