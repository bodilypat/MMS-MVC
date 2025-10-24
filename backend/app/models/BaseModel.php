<?php

class BaseModel {
    protected PDO $pdo;
    protected string $table;

    public function __construct(PDO $pdo){
        $this->pdo = $pdo;
    }
    public function getAll(): array{
        $stmt = $this->pdo->query("SELECT * FROM  {$this->table}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById(int $id): ?array {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE {$this->table}_id = :id");
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: null;
    }

    public function delete(int $id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE {$this->table}_id = :id");
        return $stmt->execute(['id' => $id]);
    }
}