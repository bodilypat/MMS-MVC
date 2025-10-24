<?php

require_once 'BaseModel.php';

class Doctor extends BaseModel {
    protected string $table = 'doctors';

    public function create(array $data): bool {
        $stmt = $this->pdo->prepare('
                INSERT INTO doctors(first_name, last_name, specialty, phone, email, availability)
                VALUES (:first_name, last_name, :specialty, :phone, :email, :availability)
            ');
        
        return $stmt->execute([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'specialty' => $data['specialty'] ?? null,
                'phone' => $data['phone'] ?? null,
                'email' => $data['email'] ?? null,
                'availability' => $data['availability'] ?? null,
        ]);
    }

    public function update(array $data): bool {
        $stmt = $this->pdo->prepare('
            UPDATE doctors 
            SET first_name = :first_name,
                last_name = :last_name,
                specialty = :specialty,
                phone = :phone,
                email = :email,
                availability = :availability,
                updated_at = CURRENT_TIMESTAMP
            WHERE doctor_id = :doctor_id
        ');

        return $stmt->execute([
                'doctor_id' => $data['doctor_id'],
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'specialty' => $data['specialty'] ?? null,
                'phone' => $data['phone'] ?? null,
                'email' => $data['emaill'] ?? null,
                'availability' => $data['availability'] ?? null
        ]);
    }
}