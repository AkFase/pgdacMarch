DELIMITER $$
CREATE PROCEDURE `import_answers`(IN `filename` VARCHAR(255))
BEGIN
    DECLARE `row` INT DEFAULT 1;
    DECLARE `col_question` INT DEFAULT 1;
    DECLARE `col_answer` INT DEFAULT 2;
    DECLARE `question` VARCHAR(255);
    DECLARE `answer` VARCHAR(255);
    DECLARE `value` VARCHAR(255);
    DECLARE `max_row` INT DEFAULT 0;
    DECLARE `i` INT DEFAULT 0;
    DECLARE `j` INT DEFAULT 0;
    DECLARE `objPHPExcel` VARCHAR(255) DEFAULT '';

    SET `objPHPExcel` = CONCAT("uploads/", `filename`);

    -- Load the Excel file
    SET @error = NULL;
    SET @filename = `objPHPExcel`;

    DROP TEMPORARY TABLE IF EXISTS `temp_answers`;
    CREATE TEMPORARY TABLE `temp_answers` (
        `question` VARCHAR(255) NOT NULL,
        `answer` VARCHAR(255) NOT NULL
    );

    INSERT INTO `temp_answers` (`question`, `answer`) VALUES ('', '');

    BEGIN
        -- Open the Excel file
        SET @error = NULL;
        SET @objPHPExcel = CONCAT("uploads/", `filename`);

        -- Load the Excel file
        SET @objPHPExcel = CONCAT("uploads/", `filename`);

        SET @objPHPExcel = CONCAT("uploads/", `filename`);
        SET @objReader = CREATEOBJECT('PHPExcel_Reader_Excel2007');
        SET @objPHPExcel = @objReader->load(@filename);
        SET @objWorksheet = @objPHPExcel->getActiveSheet();

        -- Get the maximum number of rows in the Excel file
        SELECT COUNT(*) INTO `max_row` FROM `temp_answers`;

        -- Loop through each row in the Excel file
        WHILE `row` <= `max_row` DO
            -- Get the question and answer from the current row
            SET `question` = NULL;
            SET `answer` = NULL;
            SET `i` = `row`;
            SET `j` = `col_question`;
            SET `value` = @objWorksheet->getCellByColumnAndRow(`j`, `i`)->getValue();
            IF `value` IS NOT NULL THEN
                SET `question` = `value`;
            END IF;
            SET `j` = `col_answer`;
            SET `value` = @objWorksheet->getCellByColumnAndRow(`j`, `i`)->getValue();
            IF `value` IS NOT NULL THEN
                SET `answer` = `value`;
            END IF;

            -- Insert the question and answer into the table
            IF `question` IS NOT NULL AND `answer` IS NOT NULL THEN
                INSERT INTO `answers` (`question`, `answer`) VALUES (`question`, `answer`);
            END IF;

            -- Increment the row counter
            SET `row` = `row` + 1;
        END WHILE;
    END;

    DROP TEMPORARY TABLE IF EXISTS `
