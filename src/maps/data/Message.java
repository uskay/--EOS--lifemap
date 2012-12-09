package maps.data;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.Properties;

import oauth4j.util.CommonLog;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

public class Message extends Database{
	
	public static final String CLASS_NAME = "maps.data.Message";	
	public static final String COLLECTION_NAME = "message";
	public static final String KEY_ID = "_id";
	public static final String KEY_USER = "user";
	public static final String KEY_MESSAGE = "message";
	public static final String KEY_OFFER_JOB = "offer_job";
	public static final String KEY_COMMENT_TO = "comment_to";
	public static final String KEY_POST_DATE = "post_date";
	public static final String KEY_COMMENT_COUNT = "comment_count";
	private static DBCollection col;
	
	static{		
		col = getDB().getCollection(COLLECTION_NAME);
	}
	
	public static Properties createMessage(Properties userProp, String message, String offerJobFlg){
		final String METHOD_NAME = "createMessage";
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "start.. userProp:" + userProp, CommonLog.LOG_INFO);
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "start.. message:" + message, CommonLog.LOG_INFO);
		BasicDBObject doc = new BasicDBObject();
		doc.put(KEY_USER, userProp);
		doc.put(KEY_MESSAGE, message);
		doc.put(KEY_OFFER_JOB, offerJobFlg);
		Date nowDate = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmssSSS");
		String dateString = sdf.format(nowDate);
		doc.put(KEY_POST_DATE, dateString);
		col.insert(doc);
		Properties msgProp = new Properties();
		for(Iterator it = doc.keySet().iterator();it.hasNext();){
			String key = (String)it.next();
			if(key.equals(KEY_USER)){
				Properties p = (Properties) doc.get(key);
				msgProp.putAll(p);
				continue;
			}
			if(key.equals(KEY_ID)){
				ObjectId oid = (ObjectId) doc.get(key);
				msgProp.setProperty(key, oid.toString());
				continue;
			}
			if(key.equals(KEY_POST_DATE)){
				String date = (String) doc.get(key);
				String year = date.substring(0,2);
				String month = date.substring(2,4);
				String day = date.substring(4,6);
				String hour = date.substring(6,8);
				String min = date.substring(8,10);
				msgProp.setProperty(key, year + "/" + month + "/" + day + " " + hour + ":" + min );
				continue;
			}
			msgProp.setProperty(key, (String) doc.get(key));
		}
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "end..", CommonLog.LOG_INFO);
		return msgProp;
	}
	
	public static Properties createComment(Properties userProp, String message, String commentTo){
		final String METHOD_NAME = "createComment";
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "start.. userProp:" + userProp, CommonLog.LOG_INFO);
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "start.. message:" + message, CommonLog.LOG_INFO);
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "start.. commentTo:" + commentTo, CommonLog.LOG_INFO);
		BasicDBObject doc = new BasicDBObject();
		doc.put(KEY_USER, userProp);
		doc.put(KEY_MESSAGE, message);
		doc.put(KEY_OFFER_JOB, "false");
		doc.put(KEY_COMMENT_TO, commentTo);
		Date nowDate = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmssSSS");
		String dateString = sdf.format(nowDate);
		doc.put(KEY_POST_DATE, dateString);
		col.insert(doc);
		Properties msgProp = new Properties();
		for(Iterator it = doc.keySet().iterator();it.hasNext();){
			String key = (String)it.next();
			if(key.equals(KEY_USER)){
				Properties p = (Properties) doc.get(key);
				msgProp.putAll(p);
				continue;
			}
			if(key.equals(KEY_ID)){
				ObjectId oid = (ObjectId) doc.get(key);
				msgProp.setProperty(key, oid.toString());
				continue;
			}
			if(key.equals(KEY_POST_DATE)){
				String date = (String) doc.get(key);
				String year = date.substring(0,2);
				String month = date.substring(2,4);
				String day = date.substring(4,6);
				String hour = date.substring(6,8);
				String min = date.substring(8,10);
				msgProp.setProperty("_" + key, date );
				msgProp.setProperty(key, year + "/" + month + "/" + day + " " + hour + ":" + min );
				continue;
			}
			msgProp.setProperty(key, (String) doc.get(key));
		}
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "end..", CommonLog.LOG_INFO);
		return msgProp;
	}	
	
	public static ArrayList getMessage(String lastChild, int limit){
		final String METHOD_NAME = "getMessage";
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "start.. lastChild:" + lastChild, CommonLog.LOG_INFO);
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "start.. limit:" + limit, CommonLog.LOG_INFO);
		ArrayList ret = new ArrayList();
		BasicDBObject query = new BasicDBObject();
		BasicDBObject sort = new BasicDBObject();
		int skip;
		if(!"".equals(lastChild)){
			BasicDBObject id = new BasicDBObject();
			id.put("$gte", new ObjectId(lastChild));
			query.put(KEY_ID, id);
			BasicDBObject comment_to = new BasicDBObject();
			comment_to.put("$exists", false);
			query.put(KEY_COMMENT_TO, comment_to);
			skip = col.find(query).count();
			query = new BasicDBObject();
		} else {
			skip = 0;
		}
		BasicDBObject comment_to2 = new BasicDBObject();
		comment_to2.put("$exists", false);
		query.put(KEY_COMMENT_TO, comment_to2);
		sort.put(KEY_POST_DATE, -1);
		DBCursor cursor = col.find(query).skip(skip).limit(limit+1).sort(sort);
		try {
			while(cursor.hasNext()){
				DBObject obj = cursor.next();
				Properties msgProp = new Properties();
				for(Iterator it = obj.keySet().iterator();it.hasNext();){
					String key = (String)it.next();
					if(key.equals(KEY_USER)){
						BasicDBObject prop = (BasicDBObject) obj.get(key);
						msgProp.putAll(convertBasicDBObject2Prop(prop));
						continue;
					}
					if(key.equals(KEY_ID)){
						ObjectId oid = (ObjectId) obj.get(key);
						msgProp.setProperty(key, oid.toString());
						continue;
					}
					if(key.equals(KEY_POST_DATE)){
						String date = (String) obj.get(key);
						String year = date.substring(0,2);
						String month = date.substring(2,4);
						String day = date.substring(4,6);
						String hour = date.substring(6,8);
						String min = date.substring(8,10);
						msgProp.setProperty("_" + key, date );
						msgProp.setProperty(key, year + "/" + month + "/" + day + " " + hour + ":" + min );
						continue;
					}
					msgProp.setProperty(key, (String) obj.get(key));
				}
				query.put(KEY_COMMENT_TO, msgProp.get(KEY_ID));
				msgProp.setProperty(KEY_COMMENT_COUNT, Integer.toString(col.find(query).count())); 
				ret.add(msgProp);
			}			
		} finally {
			cursor.close();
		}
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "end..", CommonLog.LOG_INFO);
		return ret;	
	}
	
	public static ArrayList getMessage(String lastChild, int limit, String userID){
		final String METHOD_NAME = "getMessage";
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "start.. lastChild:" + lastChild, CommonLog.LOG_INFO);
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "start.. limit:" + limit, CommonLog.LOG_INFO);
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "start.. userID:" + userID, CommonLog.LOG_INFO);
		ArrayList ret = new ArrayList();
		BasicDBObject query = new BasicDBObject();
		BasicDBObject sort = new BasicDBObject();
		int skip;
		if(!"".equals(lastChild)){
			BasicDBObject id = new BasicDBObject();
			id.put("$gte", new ObjectId(lastChild));
			query.put(KEY_ID, id);
			BasicDBObject comment_to = new BasicDBObject();
			comment_to.put("$exists", false);
			query.put(KEY_COMMENT_TO, comment_to);
			skip = col.find(query).count();
			query = new BasicDBObject();
		} else {
			skip = 0;
		}
		BasicDBObject comment_to2 = new BasicDBObject();
		comment_to2.put("$exists", false);
		query.put(KEY_COMMENT_TO, comment_to2);
		query.put(KEY_USER + ".id", userID);
		sort.put(KEY_POST_DATE, -1);
		DBCursor cursor = col.find(query).skip(skip).limit(limit+1).sort(sort);
		try {
			while(cursor.hasNext()){
				DBObject obj = cursor.next();
				Properties msgProp = new Properties();
				for(Iterator it = obj.keySet().iterator();it.hasNext();){
					String key = (String)it.next();
					if(key.equals(KEY_USER)){
						BasicDBObject prop = (BasicDBObject) obj.get(key);
						msgProp.putAll(convertBasicDBObject2Prop(prop));
						continue;
					}
					if(key.equals(KEY_ID)){
						ObjectId oid = (ObjectId) obj.get(key);
						msgProp.setProperty(key, oid.toString());
						continue;
					}
					if(key.equals(KEY_POST_DATE)){
						String date = (String) obj.get(key);
						String year = date.substring(0,2);
						String month = date.substring(2,4);
						String day = date.substring(4,6);
						String hour = date.substring(6,8);
						String min = date.substring(8,10);
						msgProp.setProperty("_" + key, date );
						msgProp.setProperty(key, year + "/" + month + "/" + day + " " + hour + ":" + min );
						continue;
					}
					msgProp.setProperty(key, (String) obj.get(key));
				}
				query.put(KEY_COMMENT_TO, msgProp.get(KEY_ID));
				msgProp.setProperty(KEY_COMMENT_COUNT, Integer.toString(col.find(query).count())); 
				ret.add(msgProp);
			}			
		} finally {
			cursor.close();
		}
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "end..", CommonLog.LOG_INFO);
		return ret;	
	}
	
	public static ArrayList getComment(String messageID){
		final String METHOD_NAME = "getComment";
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "start.. messageID:" + messageID, CommonLog.LOG_INFO);
		ArrayList ret = new ArrayList();
		BasicDBObject query = new BasicDBObject();
		BasicDBObject sort = new BasicDBObject();
		query.put(KEY_COMMENT_TO, messageID);
		sort.put(KEY_POST_DATE, 1);
		DBCursor cursor = col.find(query).sort(sort);
		try {
			while(cursor.hasNext()){
				DBObject obj = cursor.next();
				Properties msgProp = new Properties();
				for(Iterator it = obj.keySet().iterator();it.hasNext();){
					String key = (String)it.next();
					if(key.equals(KEY_USER)){
						BasicDBObject prop = (BasicDBObject) obj.get(key);
						msgProp.putAll(convertBasicDBObject2Prop(prop));
						continue;
					}
					if(key.equals(KEY_ID)){
						ObjectId oid = (ObjectId) obj.get(key);
						msgProp.setProperty(key, oid.toString());
						continue;
					}
					if(key.equals(KEY_POST_DATE)){
						String date = (String) obj.get(key);
						String year = date.substring(0,2);
						String month = date.substring(2,4);
						String day = date.substring(4,6);
						String hour = date.substring(6,8);
						String min = date.substring(8,10);
						msgProp.setProperty(key, year + "/" + month + "/" + day + " " + hour + ":" + min );
						continue;
					}
					msgProp.setProperty(key, (String) obj.get(key));
				}
				ret.add(msgProp);
			}			
		} finally {
			cursor.close();
		}	
		CommonLog.writeLog(CLASS_NAME, METHOD_NAME, "end..", CommonLog.LOG_INFO);
		return ret;	
	}

}
