package maps.action;

import java.util.ArrayList;
import java.util.Properties;

import maps.constants.ErrorCodeConstants;
import maps.constants.PageConstants;
import maps.data.Message;

import oauth4j.action.AbstractAction;
import oauth4j.data.GoogleKeys;
import oauth4j.data.SessionData;
import oauth4j.util.CommonLog;
import oauth4j.util.HRF;
import oauth4j.util.ObjectConverter;

public class GetOffersAction extends AbstractAction{
	
	public static final int MAX_MESSAGE = 10;

	@Override
	public void execute() {
		CommonLog.writeLog(this.getClass().getName(), METHOD_EXECUTE, "start.. request data:" + getReqData(), CommonLog.LOG_INFO);
		SessionData sd = getSessionData();
		Properties userProp = (Properties)sd.get(GoogleKeys.GOOGLE_USER_PROPERTIES);
		if(userProp==null){
			CommonLog.writeLog(this.getClass().getName(), METHOD_EXECUTE, "SESSION TIMEOUT!", CommonLog.LOG_INFO);
			write(HRF.format(HRF.RC_SYSTEM_ERROR, ErrorCodeConstants.SESSION_TIMEOUT));
			return;
		}
		String lastChild = getReqData().getProperty("lastChild");
		ArrayList messages = Message.getMessage(lastChild, MAX_MESSAGE);
		Properties retProp = new Properties();
		if(messages.size()>MAX_MESSAGE){
			retProp.setProperty("hasNext", "true");
		} else {
			retProp.setProperty("hasNext", "false");
		}
		write(HRF.format(HRF.RC_SUCCESS, "", retProp, messages, "list"));
		CommonLog.writeLog(this.getClass().getName(), METHOD_EXECUTE, "end..", CommonLog.LOG_INFO);
	}

}
