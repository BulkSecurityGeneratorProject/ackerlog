package de.ackerlog.service.impl;

import de.ackerlog.service.FieldService;
import de.ackerlog.domain.Field;
import de.ackerlog.repository.FieldRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Field.
 */
@Service
@Transactional
public class FieldServiceImpl implements FieldService {

    private final Logger log = LoggerFactory.getLogger(FieldServiceImpl.class);

    private final FieldRepository fieldRepository;

    public FieldServiceImpl(FieldRepository fieldRepository) {
        this.fieldRepository = fieldRepository;
    }

    /**
     * Save a field.
     *
     * @param field the entity to save
     * @return the persisted entity
     */
    @Override
    public Field save(Field field) {
        log.debug("Request to save Field : {}", field);
        return fieldRepository.save(field);
    }

    /**
     * Get all the fields.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Field> findAll() {
        log.debug("Request to get all Fields");
        return fieldRepository.findAll();
    }


    /**
     * Get one field by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Field> findOne(Long id) {
        log.debug("Request to get Field : {}", id);
        return fieldRepository.findById(id);
    }

    /**
     * Delete the field by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Field : {}", id);
        fieldRepository.deleteById(id);
    }
}
