DELIMITER $$

CREATE PROCEDURE `import_questions`(
  IN `input_file` VARCHAR(255),
  IN `output_table` VARCHAR(255)
)
BEGIN
  DECLARE `row_count` INT DEFAULT 0;
  DECLARE `question` VARCHAR(255);
  DECLARE `answer` VARCHAR(255);
  DECLARE `cell_value` VARCHAR(255);
  DECLARE `row_index` INT DEFAULT 1;
  DECLARE `col_index` INT DEFAULT 1;
  DECLARE `sheet_name` VARCHAR(255);
  DECLARE `cell_range` VARCHAR(255);
  DECLARE `cell_address` VARCHAR(255);
  
  SELECT COUNT(*) INTO `row_count` FROM `information_schema`.`tables`
  WHERE `table_schema` = DATABASE() AND `table_name` = `output_table`;
  
  IF `row_count` = 0 THEN
    SET @sql = CONCAT('CREATE TABLE `', `output_table`, '` (`question` VARCHAR(255), `answer` VARCHAR(255));');
    PREPARE `stmt` FROM @sql;
    EXECUTE `stmt`;
    DEALLOCATE PREPARE `stmt`;
  END IF;
  
  SET `sheet_name` = 'Sheet1';
  SET `cell_range` = 'A1:B1000';
  
  WHILE `row_index` <= 1000 DO
    SET `cell_address` = CONCAT(CHAR(64 + `col_index`), `row_index`);
    SET `cell_value` = `phpoffice_phpspreadsheet_functions::cell`(`input_file`, `sheet_name`, `cell_address`);
    
    IF `cell_value` IS NULL THEN
      LEAVE `import_questions_loop`;
    END IF;
    
    IF `col_index` = 1 THEN
      SET `question` = `cell_value`;
      SET `col_index` = 2;
    ELSE
      SET `answer` = `cell_value`;
      SET `col_index` = 1;
      
      SET @sql = CONCAT('INSERT INTO `', `output_table`, '` (`question`, `answer`) VALUES (', QUOTE(`question`), ', ', QUOTE(`answer`), ');');
      PREPARE `stmt` FROM @sql;
      EXECUTE `stmt`;
      DEALLOCATE PREPARE `stmt`;
    END IF;
    
    SET `row_index` = `row_index` + 1;
  END WHILE;
  
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET @dummy = 1;
  
  import_questions_loop: BEGIN
  END import_questions_loop;
  
END$$

DELIMITER ;
