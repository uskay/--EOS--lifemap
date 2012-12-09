package maps.data;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

import org.bson.types.ObjectId;

import oauth4j.data.GoogleKeys;
import oauth4j.util.CommonLog;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

public class User extends Database{
	
	public static final String CLASS_NAME = "maps.data.User";	
	public static final String COLLECTION_NAME = "user";
	public static final String KEY_INSERT_DATE = "insert_date";
	public static final String KEY_ID = "_id";
	private static DBCollection col;
	
	static{		
		col = getDB().getCollection(COLLECTION_NAME);
	}
	
	public static void createUser(Properties userProp){
		final String METHOD_NAME = "createUser";
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "start.. userProp:" + userProp, CommonLog.LOG_INFO);
		BasicDBObject doc = new BasicDBObject();
		for (Iterator it = userProp.entrySet().iterator(); it.hasNext();){
			Map.Entry entry = (Map.Entry)it.next();
			String key = (String)entry.getKey();
			String value = (String)entry.getValue();
			doc.put(key, value);
		}
		Date nowDate = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmssSSS");
		String dateString = sdf.format(nowDate);
		doc.put(KEY_INSERT_DATE, dateString);
		col.insert(doc);
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "end..", CommonLog.LOG_INFO);
	}
	
	public static Properties getUser(String id){
		final String METHOD_NAME = "getUser";
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "start.. id:" + id, CommonLog.LOG_INFO);
		Properties ret = null;
		BasicDBObject query = new BasicDBObject();
		query.put(GoogleKeys.KEY_ID, id);
		DBCursor cursor = col.find(query);
		try {
			while(cursor.hasNext()){
				ret = new Properties();
				DBObject obj = cursor.next();
				for(Iterator it = obj.keySet().iterator();it.hasNext();){
					String key = (String)it.next();
					if(key.equals(KEY_ID)){
						ObjectId oid = (ObjectId) obj.get(key);
						ret.setProperty(key, oid.toString());
						continue;
					}
					ret.setProperty(key, (String) obj.get(key));
				}					
			}			
		} finally {
			cursor.close();
		}
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "end.. ret:" + ret, CommonLog.LOG_INFO);
		return ret;	
	}

}
