//package facebookOriginal.facebook;
//
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository ("jdbc")
////public class UserJDBCDataAccessService  {
//
////    private final JdbcTemplate jdbcTemplate;
////    private  final UserRowMapper userRowMapper;
////
////    public UserJDBCDataAccessService(JdbcTemplate jdbcTemplate, UserRowMapper userRowMapper) {
////        this.jdbcTemplate = jdbcTemplate;
////        this.userRowMapper = userRowMapper;
////    }
////
////
////    @Override
////    public List<Users> selectAllUsers() {
////
////        var sql = """
////                SELECT id, name, email,  gender
////                FROM facebook
////                LIMIT 1000
////                """;
////
////        return jdbcTemplate.query(sql, userRowMapper);
////    }
////
////
////
////    @Override
////    public Optional<Users> selectUserById(Integer id) {
////        var sql = """
////                SELECT id, name, email, gender
////                FROM facebook
////                WHERE id = ?
////                """;
////        return jdbcTemplate.query(sql, userRowMapper, id)
////                .stream()
////                .findFirst();
////    }
////
////    @Override
////    public void insertUser(Users users) {
////        var sql = """
////                INSERT INTO facebook (id,name, email, gender)
////                VALUES (?, ?, ?,?)
////                """;
////        int result = jdbcTemplate.update(
////                sql,
////                users.getId(),
////                users.getName(),
////                users.getEmail(),
////                users.getGender().name()
////        );
////
////        System.out.println("insertUser result " + result);
////
////    }
////
////    @Override
////    public boolean existsUserWithEmail(String email) {
////        var sql = """
////                SELECT count(id)
////                FROM facebook
////                WHERE email = ?
////                """;
////        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, email);
////        return count != null && count > 0;
////
////    }
////
////    @Override
////    public boolean existsUserById(Integer id) {
////        var sql = """
////                SELECT count(id)
////                FROM facebook
////                WHERE id = ?
////                """;
////        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
////        return count != null && count > 0;
////    }
////
////    @Override
////    public void deleteUserById(Integer userId) {
////        var sql = """
////                DELETE
////                FROM facebook
////                WHERE id = ?
////                """;
////        int result = jdbcTemplate.update(sql, userId);
////        System.out.println("deleteUserById result = " + result);
////
////    }
////
////    @Override
////    public void updateUser(Users update) {
////        if (update.getName() != null) {
////            String sql = "UPDATE facebook SET name = ? WHERE id = ?";
////            int result = jdbcTemplate.update(
////                    sql,
////                    update.getName(),
////                    update.getId()
////            );
////            System.out.println("update users name result = " + result);
////        }
////
////        if (update.getEmail() != null) {
////            String sql = "UPDATE facebook SET email = ? WHERE id = ?";
////            int result = jdbcTemplate.update(
////                    sql,
////                    update.getEmail(),
////                    update.getId());
////            System.out.println("update users email result = " + result);
////        }
////
////    }
////
////
//}
