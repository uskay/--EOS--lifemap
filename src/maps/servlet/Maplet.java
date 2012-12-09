package maps.servlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import oauth4j.data.SessionData;
import oauth4j.servlet.Action;
import oauth4j.util.CommonLog;
import oauth4j.util.HRF;

public class Maplet extends Action{

	@Override
	public String getActionPackage() {
		return "maps.action.";
	}
	
	@Override
	public void controlRequest(HttpServletRequest request, HttpServletResponse response){
		final String METHOD_NAME = "controlRequest";
		String commandName = request.getServletPath();
		if(commandName.equals("/Logout.action")){
			CommonLog.writeLog(this.getClass().getName(), METHOD_NAME, "Command="+commandName, CommonLog.LOG_INFO);
			SessionData.setSessionData(request, null);
			write(HRF.format(HRF.RC_SUCCESS, ""));
			return;
		} 
		super.controlRequest(request, response);		
	}

}
