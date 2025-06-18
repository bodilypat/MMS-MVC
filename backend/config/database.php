<?php

	class Database {
		private static $host = 'localhost';
		private static $db_name = 'dbmedical';
		private static $username = 'root';
		private static $conn = null;
		
		public static function getConnection() {
			if (self::$conn === null) {
				try {
					self::$conn = new PDO (
						"mysql:host=" . self::$host . ";dbname=" . self::$db_name . ";charset=utf8mb4",
						self::$username,
						self::$password
					);
					self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				} catch (PDOException $e) {
					http_response_code(500);
					echo json_encode([
						"error" => "Database connection failed.",
						"details" => $e->getMessage();
					]);
					exit();
				}
			}
			return self::$conn;
		}
	}
?>
