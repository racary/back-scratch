const { Client } = require('pg')
const { v4: uuidv4 } = require('uuid')

const table = '"Back Scratch".back_scratchers';
let client;

class ControllerDS {
  async init() {
    const connectionString = this.process.env.connectionString

    client = new Client({
      connectionString
    });

    try {
      await client.connect();
      console.info('ControllerDS initialized successfully.')
    } catch (err) {
      console.error('Unable to connect to database', err);
    }
  }

  async getAllBackScratchers() {
    try {
      const query = `SELECT * from ${table}`;
      const result = await client.query(query);

      if (result.rows.length) {
        return result.rows
      } else {
        return [];
      }
    } catch (err) {
      console.error('Database error - unable to get backscratchers', err);
      throw err;
    }
  }

  async udpateBackScratcher(id, set) {
    const query = `UPDATE ${table} SET ${set} WHERE id=${id}`;

    try {
      return await client.query(query);
    } catch (err) {
      console.error(`Database error - Unable to update backscratcher with id: ${id}`, err);
      throw err;
    }
  }

  async createBackScratcher(backScratcher) {
    const { description, name, price, size } = backScratcher

    try {
      const query = `INSERT INTO ${table}(name, description, size, price) VALUES($1, $2, $3, $4) RETURNING *`;

      const { rows } = await client.query(query, [name, description, `{${size.join(',')}}`, price])
      return rows[0]
    } catch (err) {
      console.error('Database error - Unable to add new backscratcher', err);
      throw err;
    }
  }

  async deleteBackScratcher(id) {
    const query = `DELETE FROM ${table} WHERE id=${id}`
    try {
      await client.query(query);
    } catch (err) {
      console.error(`Database error - Unable to delete backscratcher with id: ${id}`, err);
      throw err;
    }
  }
}

module.exports = new ControllerDS();