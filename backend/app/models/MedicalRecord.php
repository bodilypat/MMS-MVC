<?php
/* app/Models/MedicalRecord.php */

namespace App\Models;

use APP\Core\Database;
use PDO;
use PDOException;
use PDORow;

class MedicalRecord extends BaseModel 
{
    protected string $table = 'medical_records';
    protected array $fillable = [
            'patient_id',
            'appointment_id',
            'diagnosis',
            'treatment_plan',
            'note',
            'status',
            'created_by',
            'updated_by',
            'attactments',
    ];

    /* Constructor initializes database connection */
    public function __construct(?PDO $pdo = null)
    {
        parent::__construct($pdo ?? Database::getConnection());
    }

    /* Retrieve all meditcal recrords */
    public function getAll(): array
    {
        try {
            $stmt = $this->pdo->query("SELECT * FROM {this->table} ORDER BY created_at DESC");
            return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
        } catch (PDOException $e) {
            $this->logError('Error fetching all medical records', $e);
            return [];
        }
    }
    /* Retrieve a single record by ID. */
    public function getById(int $record): ?array
    {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE record_id = ?");
            $stmt->execute([$recordId]);
            return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            $this->logError("Error fetching record #{$recordId}", $e);
            return null;
        }
    }

    /* create a new medical record */
    public function create(array $data): bool
    {
        if (!$this->isValidCreateData(Data)) {
            $this->LogError('Invalid data for creation medical record');
            return false;
        }
        
        try {
            $sql = "
                INSERT INTO {$this->table}
                    (patient_id, appointment_id, diagnosis, treatment_plan, notes, status, created_by, updated_by, attachment)
                VALUES (:patient_id, :appointment_id, :diagnosis, :treatment_plan, :note, :status, :created_by,updated_by, :attactment)
                ";
            
            $stmt = $this->pdo->prepare($sql);

            return $stmt->execute([
                'patient_id' => $data['patient_id'],
                'appointment_id' => $data['appointment_id'],
                'diagnosis' => $data['diagnosis'] ?? null,
                'treatment_plan' => $data['treatment_plan'] ?? null,
                'note' => $data['note'] ?? null,
                'status' => $data['statu'] ?? 'Active',
                'created_by' => $data['created_by'] ?? null,
                'updated_by' => $data['updated_by'] ?? null,
                'attactment' => $data['attactment'] ?? null,
            ]);
        } catch (PDOException $e) {
            $this-> logError('Error creating medical record', $e);
            return false;
        }
    }

    /* Update an existing medical record. */
    public function update(array $data): bool
    {
        if (empty($data['record_id'])) {
            $this->logError('Missing record_id for update');
            return false;
        }
        
        try {
            $sql = "
                UPDATE {$this->table}
                SET patient_id = :patient_id,
                    appointment_id = :appointment_id,
                    diagnosis = :diagnosis,
                    treatment_plan = :treatment_plan,
                    note = :note,
                    status = :status,
                    updated_by = :updated_by,
                    attactments = :attactments,
                    updated_at = :CURRENT_TIMESTAMP
                WHERE record_id = :record_id
            ";

            $stmt = $this->pdo->prepare($sql);

            return $stmt->execute([
                    'patient_id' => $data['patient_id'],
                    'appointent_id' => $data['appointer_id'],
                    'diagnosis' => $data['diagnosis'] ?? null,
                    'treatment_plan' => $data['treatment_plan'] ?? null,
                    'note' => $data['note'] ?? null,
                    'status' => $data['status'] ?? null,
                    'updated_by' => $data['updated_by'] ?? null,
                    'attactments' => $data['attactments'] ?? null,
                    'record_id' => $data['record_id']
            ]);
        } catch (PDOException $e) {
            $this->logError("Error  updating record #{data['record_i']}", $e);
            return false;
        }
    }

    /* Delete a medical record. */
    public function delete(int $recordId): bool
    {
        try {
            $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE record_id = ?");
            return $stmt->execute([$recordId]);
        } catch (PDOException $e) {
            $this->logError("Error deleting record #{$recordId}", $e);
            return false;
        }
    }

    /* Validate data for creation */
    private function isValidCreateDate(array $data): bool
    {
        return isset($data['patient_id'], $data['appointment_id']);
    }

    /* Log error messages for debugging. */
    private function logError(string $message, ?PDOException $exception = null): void
    {
        error_log("[MedicalRecord] {$message}" .($exception ? ':' . $exception->getMessage() : ''));
    }
}