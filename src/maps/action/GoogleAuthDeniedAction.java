package maps.action;

import maps.constants.PageConstants;

import oauth4j.action.AbstractAction;
import oauth4j.util.CommonLog;

public class GoogleAuthDeniedAction extends AbstractAction{

	@Override
	public void execute() {
		CommonLog.writeLog(this.getClass().getName(), METHOD_EXECUTE, "start.. request data:" + getReqData(), CommonLog.LOG_INFO);
		sendRedirect(PageConstants.PAGE_REDIRECT_TO_TOP);	
		CommonLog.writeLog(this.getClass().getName(), METHOD_EXECUTE, "end..", CommonLog.LOG_INFO);
	}

}
