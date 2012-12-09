package maps.action;

import oauth4j.action.AbstractAction;
import oauth4j.util.CommonLog;
import oauth4j.util.HRF;

public class ClientErrorAction extends AbstractAction{

	@Override
	public void execute() {
		CommonLog.writeLog(this.getClass().getName(), METHOD_EXECUTE, "error data:" + getReqData(), CommonLog.LOG_INFO);
		write(HRF.format(HRF.RC_SUCCESS, ""));
	}

}
