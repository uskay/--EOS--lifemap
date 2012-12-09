package maps.data;

import java.net.UnknownHostException;
import java.util.Iterator;
import java.util.Properties;

import oauth4j.util.PropertiesUtil;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.Mongo;

public class Database {
	
	private static Mongo m;
	private static DB db;
	private static final String DB_PROPERTIES = "Database.properties";
	private static final String KEY_MONGO_HOST = "MONGO_HOST";
	private static final String KEY_MONGO_PORT = "MONGO_PORT";
	private static final String KEY_MONGO_DB = "MONGO_DB";

	static{
		Properties mongoProp = new PropertiesUtil(DB_PROPERTIES);
		String host = mongoProp.getProperty(KEY_MONGO_HOST);
		int port = Integer.parseInt(mongoProp.getProperty(KEY_MONGO_PORT));
		String dbName = mongoProp.getProperty(KEY_MONGO_DB);
		
		try {
			m = new Mongo( host, port );
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		db = m.getDB( dbName );
	}
	
	protected static DB getDB(){
		return db;
	}
	
	protected static Properties convertBasicDBObject2Prop(BasicDBObject target){
		Properties ret = new Properties();
		for(Iterator ite = target.keySet().iterator();ite.hasNext();){
			String key = (String) ite.next();
			ret.setProperty(key, target.getString(key));
		}
		return ret;
	}

}
